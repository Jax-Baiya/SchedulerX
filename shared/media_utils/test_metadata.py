import os
import tempfile
from shared.media_utils import metadata

def test_extract_image_metadata():
    try:
        from PIL import Image
    except ImportError:
        import pytest
        pytest.skip('Pillow not installed')
    with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as tmp:
        img = Image.new('RGB', (100, 200), color='red')
        img.save(tmp.name)
        meta = metadata.extract_image_metadata(tmp.name)
        assert meta['width'] == 100
        assert meta['height'] == 200
        assert meta['format'] == 'PNG'
    os.remove(tmp.name)

def test_extract_metadata_dispatch():
    try:
        from PIL import Image
    except ImportError:
        import pytest
        pytest.skip('Pillow not installed')
    with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp:
        img = Image.new('RGB', (10, 10), color='blue')
        img.save(tmp.name)
        meta = metadata.extract_metadata(tmp.name)
        assert meta['width'] == 10
        assert meta['height'] == 10
        assert meta['format'] == 'JPEG'
    os.remove(tmp.name)

def test_validate_metadata():
    meta = {'width': 100, 'height': 200, 'duration': 10}
    assert metadata.validate_metadata(meta, {'min_width': 50, 'max_duration': 20})
    assert not metadata.validate_metadata(meta, {'min_width': 150})
    assert not metadata.validate_metadata(meta, {'max_duration': 5})
